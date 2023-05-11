import axios from 'axios'
import authHeader from '@/services/auth-header';

export const documentModule = {
    state: () => ({
        isSearched: false,
        searchValue: "",
        numOfResults: 0,
        documents: [],
        documentsLoading: false
    }),
    getters: {
        getDocumentById: (state) => (id) => {
            return state.documents.find(document => document.id === id)
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
        getDocumentById(state, id) {

        }
    },
    actions: {
        async fetchDocumentsV2({ state, commit }) {
            try {
                commit('setSearched', false)
                commit('setDocuments', [])
                commit('setLoading', true)

                const response = await axios.get('http://localhost:8080/api/v2/smk/find?value=' + state.searchValue, { headers: authHeader() })
                // console.log(response.request)
                // console.log(response)

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

                        let date = e.content.date
                        if (e.highlightFields?.date) {
                            e.highlightFields.date.forEach(date => find.push(date))
                        }

                        let links = e.content.links
                        if (e.highlightFields?.links) {
                            e.highlightFields.links.forEach(links => find.push(links))
                        }

                        let appendix = e.content.appendix
                        if (e.highlightFields?.appendix) {
                            e.highlightFields.appendix.forEach(appendix => find.push(appendix))
                        }

                        let approval_sheet = e.content.approval_sheet
                        if (e.highlightFields?.approval_sheet) {
                            e.highlightFields.approval_sheet.forEach(approval_sheet => find.push(approval_sheet))
                        }

                        let version = e.content.version

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
                            version
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