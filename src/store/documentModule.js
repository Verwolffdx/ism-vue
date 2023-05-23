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
        document: null
    }),
    getters: {
        getDocumentById: (state) => (id) => {
            return state.documents.find(document => document.id === id)
        },
        getDocument: (state) => {
            return state.document
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
        }
    },
    actions: {
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
                        isFavorite: false
                    }


                    let find = []


                    // let find = []
                    // let id_item = 0
                    let id_item = 0
                    let id = response.data.id

                    let code = response.data.code
                    if (response.data.highlightFields?.code) {
                        code = response.data.highlightFields.code[0]
                        response.data.highlightFields.code.forEach(code => find.push({ ref: id_item++, item: code }))
                    }

                    let title = response.data.name
                    if (response.data.highlightFields?.name) {
                        title = response.data.highlightFields.name[0]
                        response.data.highlightFields.name.forEach(title => find.push({ ref: id_item++, item: title }))
                    }



                    let content = response.data.content
                    // if (response.data.highlightFields?.code) {
                    //     response.data.highlightFields.code.forEach(content => find.push({ ref: id_item++, item: content }))
                    // }
                    // if (response.data.highlightFields?.name) {
                    //     response.data.highlightFields.name.forEach(content => find.push({ ref: id_item++, item: content }))
                    // }

                    if (response.data.highlightFields?.["content.chapter"]) {
                        response.data.highlightFields["content.chapter"].forEach(content => find.push({ ref: id_item++, item: content }))
                    }

                    if (response.data.highlightFields?.["content.chapter_title"]) {
                        response.data.highlightFields["content.chapter_title"].forEach(content => find.push({ ref: id_item++, item: content }))
                    }
                    // // TODO Синхронизировать содержание документа и найденные элементы для скоролла к ним
                    // // find.forEach(item => {

                    // // })

                    let date = response.data.date
                    if (response.data.highlightFields?.date) {
                        response.data.highlightFields.date.forEach(date => find.push({ ref: id_item++, item: date }))
                    }

                    let links = response.data.links
                    if (response.data.highlightFields?.links) {
                        response.data.highlightFields.links.forEach(links => find.push({ ref: id_item++, item: links }))
                    }

                    let appendix = response.data.appendix
                    if (response.data.highlightFields?.appendix) {
                        response.data.highlightFields.appendix.forEach(appendix => find.push({ ref: id_item++, item: appendix }))
                    }

                    let approval_sheet = response.data.approval_sheet
                    if (response.data.highlightFields?.approval_sheet) {
                        response.data.highlightFields.approval_sheet.forEach(approval_sheet => find.push({ ref: id_item++, item: approval_sheet }))
                    }

                    let version = response.data.version

                    let isFavorite = response.data.favorite

                    

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