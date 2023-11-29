import {
    DELETE_USER_FILTER_SEARCH_ONE_ITEM,
    SET_ADMIN_COMIC_MENU_SELECT,
    SET_ADMIN_MENU_SELECT,
    SET_USER_FILTER_SEARCH,
    SET_USER_FILTER_SEARCH_CHAP,
    SET_USER_FILTER_SEARCH_GENRE,
    SET_USER_FILTER_SEARCH_STATE,
    SET_USER_FILTER_SEARCH_TYPE,
    SET_USER_SEARCH_ORDER,
    SET_USER_SEARCH_RESET,
} from "./Constant";

// Admin Menu
export const setAdminSelect = (payload) => ({
    type: SET_ADMIN_MENU_SELECT,
    payload,
});

//Admin Comic
export const setAdmincComicMenu = (payload) => ({
    type: SET_ADMIN_COMIC_MENU_SELECT,
    payload,
});

//User search
export const setUserFilterSearch = (payload) => ({
    type: SET_USER_FILTER_SEARCH,
    payload,
});
export const setUserFilterSearchChap = (payload) => ({
    type: SET_USER_FILTER_SEARCH_CHAP,
    payload,
});
export const setUserFilterSearchType = (payload) => ({
    type: SET_USER_FILTER_SEARCH_TYPE,
    payload,
});
export const setUserFilterSearchGenre = (payload) => ({
    type: SET_USER_FILTER_SEARCH_GENRE,
    payload,
});
export const setUserFilterSearchState = (payload) => ({
    type: SET_USER_FILTER_SEARCH_STATE,
    payload,
});

export const deleteUserFilterSearchOneItem = (payload) => ({
    type: DELETE_USER_FILTER_SEARCH_ONE_ITEM,
    payload,
});

export const setUserFilterSearchReset = () => ({
    type: SET_USER_SEARCH_RESET,
});

export const setUserSearchOrder = (payload) => ({
    type: SET_USER_SEARCH_ORDER,
    payload,
});
