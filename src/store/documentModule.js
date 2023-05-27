import axios from 'axios'
import authHeader from '@/services/auth-header';
import { auth } from '@/store/auth.module'

export const documentModule = {
    state: () => ({
        isSearched: false,
        searchValue: "",
        numOfResults: 0,
        documents: [],
        documentsLoading: false,
        document: null,
        familiarizationSheetForUser: []
    }),
    getters: {
        getDocumentById: (state) => (id) => {
            return state.documents.find(document => document.id === id)
        },
        getDocument: (state) => {
            return state.document
        },
        getFamiliarizationSheetForUser: (state) => {
            return state.familiarizationSheetForUser
        }
    },
    mutations: {
        setDocuments(state, documents) {
            state.documents = documents
        },
        setSearched(state, bool) {
            state.isSearched = bool
        },
        setSearchValue(state, searchValue) {
            state.searchValue = searchValue
            localStorage.setItem('searchValue', searchValue);
        },
        setNumOfResults(state, numOfResults) {
            state.numOfResults = numOfResults
        },
        setLoading(state, bool) {
            state.documentsLoading = bool
        },
        pushDocuments(state, document) {
            state.documents.push(document)
        },
        setDocument(state, document) {
            state.document = document
        },
        setFamSheet(state, famSheet) {
            state.familiarizationSheetForUser = famSheet
        }
    },
    actions: {
        async getDocumentFile({ state, commit }, doc_id) {
            try {

                // axios({
                //     method: 'get',
                //     url: 'https://myapi.com/files/4hjiguo4ho45946794526975429',
                //     responseType: 'stream'
                // })
                //     .then(function (response) {
                //         let headerLine = response.data.headers['content-disposition'];
                //         let headerLine = response.headers['Content-Disposition'];
                //         let startFileNameIndex = headerLine.indexOf('"') + 1
                //         let endFileNameIndex = headerLine.lastIndexOf('"');
                //         let filename = headerLine.substring(startFileNameIndex, endFileNameIndex);
                //         response.data.pipe(fs.createWriteStream(filename));
                //     });

                const response = await axios.get('http://localhost:8080/api/v2/smk/file/' + doc_id,
                    {
                        headers: authHeader(),
                        responseType: 'blob'
                    }
                )



                if (response.status == 200) {
                    // console.log(response.data)

                    // let blob = new Blob([response.data], { type: 'application/pdf' })

                    // const url = window.URL.createObjectURL(blob);
                    // const a = document.createElement("a");
                    // a.style.display = "none";
                    // a.href = url;
                    // a.download = "file.pdf";
                    // document.body.appendChild(a);
                    // a.click();
                    // window.URL.revokeObjectURL(url);

                    // window.open(url);


                    // console.log(title)


                    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/msword' }))
                    const link = document.createElement('a')
                    link.href = url

                    var contentDisposition = response.headers["content-disposition"];
                    var match = contentDisposition.match(/filename\s*=\s*"(.+)"/i);
                    var filename = match[1];
                    
                    link.setAttribute('download', filename)
                    document.body.appendChild(link)
                    link.click()
                }
            } catch (e) {
                alert(e)
                console.log(e)
            }
        },
        async fecthFamiliarizationSheetForUser({ state, commit }) {
            try {
                const response = await axios.get('http://localhost:8080/api/v2/smk/familiarizationForUser/' + auth.state.user.id,
                    { headers: authHeader() }
                )

                if (response.status == 200) {
                    console.log(response.data)
                    commit('setFamSheet', response.data)
                }
            } catch (e) {
                alert(e)
                console.log(e)
            }
        },
        async getDocumentByIdWithHighlight({ state, commit }, doc_id) {
            try {
                // commit('setSearched', false)
                // commit('setDocuments', [])
                // commit('setLoading', true)

                // console.log(123123123)



                let body = {
                    document_id: doc_id,
                    value: state.searchValue == "" ? "" : state.searchValue,
                    user_id: auth.state.user.id,
                }

                const response = await axios.post('http://localhost:8080/api/v2/smk/document', body,
                    { headers: authHeader() },
                )
                // console.log(response.request)
                // console.log(response)

                if (response.status === 200) {
                    commit('setSearched', true)


                    let document = {
                        id: "",
                        code: "",
                        title: "",
                        content: [],
                        find: [],
                        date: [],
                        links: [],
                        appendix: [],
                        approval_sheet: [],
                        version: "",
                        isFavorite: false,
                        isFamiliarize: false
                    }


                    let find = []


                    // let find = []
                    // let id_item = 0
                    let id_item = 0
                    let id = response.data.id

                    let code = response.data.code
                    if (response.data.highlightFields?.code) {
                        code = response.data.highlightFields.code[0]
                        response.data.highlightFields.code.forEach(code => find.push({ ref_id: "ref-id-" + id_item++, item: code }))
                    }

                    let title = response.data.name
                    if (response.data.highlightFields?.name) {
                        title = response.data.highlightFields.name[0]
                        response.data.highlightFields.name.forEach(title => find.push({ ref_id: "ref-id-" + id_item++, item: title }))
                    }



                    // let content = response.data.content
                    let content = []
                    response.data.content.forEach(item => {
                        let chapter_title = item.chapter_title
                        let ref_id = null



                        let chapter = []
                        item.chapter.forEach(chapter_content => {
                            let chapter_item = {
                                chapter_text: chapter_content,
                                ref_id: ref_id
                            }
                            chapter.push(chapter_item)
                        })


                        content.push({
                            chapter_title,
                            chapter,
                            ref_id
                        })
                    })
                    // if (response.data.highlightFields?.code) {
                    //     response.data.highlightFields.code.forEach(content => find.push({ ref: id_item++, item: content }))
                    // }
                    // if (response.data.highlightFields?.name) {
                    //     response.data.highlightFields.name.forEach(content => find.push({ ref: id_item++, item: content }))
                    // }

                    if (response.data.highlightFields?.["content.chapter"]) {
                        response.data.highlightFields["content.chapter"].forEach(content => find.push({ ref_id: "ref-id-" + id_item++, item: content }))
                    }

                    if (response.data.highlightFields?.["content.chapter_title"]) {
                        response.data.highlightFields["content.chapter_title"].forEach(content => find.push({ ref_id: "ref-id-" + id_item++, item: content }))
                    }
                    // // TODO Синхронизировать содержание документа и найденные элементы для скоролла к ним
                    find.forEach(find_item => {

                        let f_item = find_item.item.replace("<strong>", "")
                        f_item = f_item.replace("</strong>", "")
                        content.forEach(content_item => {

                            if (content_item.chapter_title.includes(f_item)) {
                                content_item.ref_id = find_item.ref_id
                            }

                            content_item.chapter.forEach(chapter_item => {
                                if (chapter_item.chapter_text.includes(f_item)) {
                                    chapter_item.ref_id = find_item.ref_id
                                }
                            })

                        })
                    })

                    // content.forEach(content_item => {
                    //     console.log(content_item.ref)
                    // })


                    let date = response.data.date
                    if (response.data.highlightFields?.date) {
                        response.data.highlightFields.date.forEach(date => find.push({ ref_id: "ref-id-" + id_item++, item: date }))
                    }

                    let links = response.data.links
                    if (response.data.highlightFields?.links) {
                        response.data.highlightFields.links.forEach(links => find.push({ ref_id: "ref-id-" + id_item++, item: links }))
                    }

                    let appendix = response.data.appendix
                    if (response.data.highlightFields?.appendix) {
                        response.data.highlightFields.appendix.forEach(appendix => find.push({ ref_id: "ref-id-" + id_item++, item: appendix }))
                    }

                    let approval_sheet = response.data.approval_sheet
                    if (response.data.highlightFields?.approval_sheet) {
                        response.data.highlightFields.approval_sheet.forEach(approval_sheet => find.push({ ref_id: "ref-id-" + id_item++, item: approval_sheet }))
                    }

                    let version = response.data.version

                    let isFavorite = response.data.favorite

                    let isFamiliarize = response.data.familiarize



                    document.id = id;
                    document.code = code
                    document.title = title
                    document.content = content
                    document.find = find
                    document.date = date
                    document.links = links
                    document.appendix = appendix
                    document.approval_sheet = approval_sheet
                    document.version = version
                    document.isFavorite = isFavorite
                    document.isFamiliarize = isFamiliarize





                    commit('setDocument', document)

                    // console.log(state.document)


                    // commit('setNumOfResults', state.documents.length)
                }
            } catch (e) {
                alert(e)
                console.log(e)

            } finally {
                // commit('setLoading', false)
            }
        },
        async fetchDocumentsV2({ state, commit }) {
            try {
                commit('setSearched', false)
                commit('setDocuments', [])
                commit('setLoading', true)

                let body = {
                    user_id: auth.state.user.id,
                    search_value: state.searchValue
                }

                const response = await axios.post('http://localhost:8080/api/v2/smk/find', body,
                    { headers: authHeader() },
                )
                // console.log(response.request)
                // console.log(response)

                if (response.status === 200) {
                    commit('setSearched', true)

                    console.log(response.data)

                    response.data.forEach(e => {
                        let find = []
                        let id_item = 0

                        let id = e.id
                        let code = e.code
                        if (e.highlightFields?.code) {
                            code = e.highlightFields.code[0]
                        }
                        let title = e.name
                        if (e.highlightFields?.name) {
                            title = e.highlightFields.name[0]
                        }


                        // if (e.highlightFields?.appendix) {
                        //     e.highlightFields.appendix.forEach(appendix => find.push({ ref: id_item++, item: appendix }))
                        // }

                        let content = e.content
                        if (e.highlightFields?.code) {
                            e.highlightFields.code.forEach(content => find.push({ ref: id_item++, item: content }))
                        }
                        if (e.highlightFields?.name) {
                            e.highlightFields.name.forEach(content => find.push({ ref: id_item++, item: content }))
                        }

                        if (e.highlightFields?.["content.chapter"]) {
                            e.highlightFields["content.chapter"].forEach(content => find.push({ ref: id_item++, item: content }))
                        }

                        if (e.highlightFields?.["content.chapter_title"]) {
                            e.highlightFields["content.chapter_title"].forEach(content => find.push({ ref: id_item++, item: content }))
                        }
                        // TODO Синхронизировать содержание документа и найденные элементы для скоролла к ним
                        // find.forEach(item => {

                        // })

                        let date = e.date
                        if (e.highlightFields?.date) {
                            e.highlightFields.date.forEach(date => find.push({ ref: id_item++, item: date }))
                        }

                        let links = e.links
                        if (e.highlightFields?.links) {
                            e.highlightFields.links.forEach(links => find.push({ ref: id_item++, item: links }))
                        }

                        let appendix = e.appendix
                        if (e.highlightFields?.appendix) {
                            e.highlightFields.appendix.forEach(appendix => find.push({ ref: id_item++, item: appendix }))
                        }

                        let approval_sheet = e.approval_sheet
                        if (e.highlightFields?.approval_sheet) {
                            e.highlightFields.approval_sheet.forEach(approval_sheet => find.push({ ref: id_item++, item: approval_sheet }))
                        }

                        let version = e.version

                        let isFavorite = e.favorite

                        commit('pushDocuments', {
                            id,
                            code,
                            title,
                            content,
                            find,
                            date,
                            links,
                            appendix,
                            approval_sheet,
                            version,
                            isFavorite
                        })
                    })

                    commit('setNumOfResults', state.documents.length)
                }
            } catch (e) {
                alert(e)
                console.log(e)

            } finally {
                commit('setLoading', false)
            }
        },
        async fetchDocuments({ state, commit }) {
            try {
                commit('setSearched', false)
                commit('setDocuments', [])
                commit('setLoading', true)

                const response = await axios.get('http://localhost:8080/api/smk/find?field=content&value=' + state.searchValue, { headers: authHeader() })

                if (response.status === 200) {
                    commit('setSearched', true)

                    response.data.forEach(e => {
                        let id = e.content.id
                        let code = e.content.code
                        if (e.highlightFields?.code) {
                            code = e.highlightFields.code[0]
                        }
                        let title = e.content.name
                        if (e.highlightFields?.name) {
                            title = e.highlightFields.name[0]
                        }

                        let find = []
                        if (e.highlightFields?.appendix) {
                            e.highlightFields.appendix.forEach(appendix => find.push(appendix))
                        }

                        let content = e.content.content
                        if (e.highlightFields?.content) {
                            e.highlightFields.content.forEach(content => find.push(content))
                        }
                        commit('pushDocuments', {
                            id,
                            code,
                            title,
                            content,
                            find
                        })
                    })

                    commit('setNumOfResults', state.documents.length)
                }
            } catch (e) {
                alert(e)
                console.log(e)

            } finally {
                commit('setLoading', false)
            }
        }
    },
    namespaced: true
}