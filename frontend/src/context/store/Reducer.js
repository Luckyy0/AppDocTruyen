import {
    DELETE_USER_FILTER_SEARCH_ONE_ITEM,
    SET_ADMIN_COMIC_MENU_SELECT,
    SET_ADMIN_MENU_SELECT,
    SET_USER_FILTER_SEARCH,
    SET_USER_FILTER_SEARCH_CHAP,
    SET_USER_FILTER_SEARCH_GENRE,
    SET_USER_FILTER_SEARCH_STATE,
    SET_USER_SEARCH_ORDER,
    SET_USER_SEARCH_RESET,
} from "./Constant";

const initState = {
    // admin menu
    adminMenuSelect: 0,
    // admin comic
    adminComicMenuSelect: 0,
    // user search filter sidebar
    userSearchFilterSidebar: [],
    userSearchFilterGenre: new Set(),
    userSearchFilterState: "",
    userSearchFilterChap: "",
    userSearchOrder: 0,
};

function reducer(state, action) {
    switch (action.type) {
        // Admin Sidebar
        case SET_ADMIN_MENU_SELECT:
            return {
                ...state,
                adminMenuSelect: action.payload,
            };

        // Admin Comic page
        case SET_ADMIN_COMIC_MENU_SELECT:
            return {
                ...state,
                adminComicMenuSelect: action.payload,
            };

        // User search
        case SET_USER_FILTER_SEARCH_GENRE:
            return {
                ...state,
                userSearchFilterGenre: state.userSearchFilterGenre.add(
                    action.payload
                ),
            };
        case SET_USER_FILTER_SEARCH_CHAP:
            return {
                ...state,
                userSearchFilterChap: action.payload,
            };
        case SET_USER_FILTER_SEARCH_STATE:
            return {
                ...state,
                userSearchFilterState: action.payload,
            };
        case SET_USER_FILTER_SEARCH:
            return {
                ...state,
                userSearchFilterSidebar: [
                    ...state.userSearchFilterGenre,
                    state.userSearchFilterState,
                    state.userSearchFilterChap,
                ],
            };
        case DELETE_USER_FILTER_SEARCH_ONE_ITEM:
            if (state.userSearchFilterChap === action.payload) {
                state.userSearchFilterChap = "";
            }
            if (state.userSearchFilterState === action.payload) {
                state.userSearchFilterState = "";
            }
            if (state.userSearchFilterGenre.has(action.payload)) {
                state.userSearchFilterGenre.delete(action.payload);
            }
            return {
                ...state,
                userSearchFilterSidebar: [
                    ...state.userSearchFilterGenre,
                    state.userSearchFilterState,
                    state.userSearchFilterChap,
                ],
            };
        case SET_USER_SEARCH_RESET:
            return {
                ...state,
                userSearchFilterSidebar: [],
                userSearchFilterGenre: new Set(),
                userSearchFilterState: "",
                userSearchFilterChap: "",
            };
        case SET_USER_SEARCH_ORDER:
            return {
                ...state,
                userSearchOrder: action.payload,
            };
        default:
            throw new Error("Invalid case");
    }
}

export { initState };
export default reducer;
