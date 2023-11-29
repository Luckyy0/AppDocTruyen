import { addMonths, parseISO } from "date-fns";
import privateApi from "../api/PrivateApi";
import publicApi from "../api/PublicApi";
export const addComicToReadingList = (newComic) => {
    let readingList = [];
    const storedReadList = localStorage.getItem("readingList");
    if (storedReadList) {
        readingList = [...JSON.parse(storedReadList)];
    }
    // Lấy danh sách truyện từ Local Storage
    const currentReadList = readingList.slice();
    //Kiểm tra truyện đã tồn tại trong danh sách chưa
    const index = currentReadList.findIndex(
        (it) => it.comicId === newComic.comicId
    );
    if (index !== -1) {
        currentReadList.splice(index, 1);
        currentReadList.unshift(newComic);
    } else {
        // Kiểm tra xem số lượng truyện có vượt quá 5 không
        if (currentReadList.length >= 5) {
            // Nếu có, xóa truyện cuối cùng
            currentReadList.pop();
        }
        // Thêm truyện mới vào đầu danh sách
        currentReadList.unshift(newComic);
    }
    // Cập nhật state và lưu vào Local Storage
    localStorage.setItem("readingList", JSON.stringify(currentReadList));
};

export const handleAddViewIntoDatabase = async (comicId, chapId) => {
    try {
        await privateApi.post("/view/" + comicId, {
            chapId: parseFloat(chapId),
        });
    } catch (error) {
        console.log(error);
    }
};
export const handleAddViewOnClick = async (comicId) => {
    try {
        await publicApi.post("/comic/addView/" + comicId);
    } catch (error) {
        console.log(error);
    }
};

export const handleAddView = async (comicId, chapId, infoChapter) => {
    await handleAddViewIntoDatabase(comicId, chapId);
    addComicToReadingList(infoChapter);
};

export const getExpirationSubscription = (dateStr,duration)=>{
    const inputDate = parseISO(dateStr);
    const newDate = addMonths(inputDate, duration);
    return newDate.toLocaleString();
}


export const formatDateString = (dateStr) => {
    const dateTimeString = dateStr;
    const year = parseInt(dateTimeString.substring(0, 4), 10);
    const month = parseInt(dateTimeString.substring(4, 6), 10) - 1; 
    const day = parseInt(dateTimeString.substring(6, 8), 10);
    const hours = parseInt(dateTimeString.substring(8, 10), 10);
    const minutes = parseInt(dateTimeString.substring(10, 12), 10);
    const seconds = parseInt(dateTimeString.substring(12, 14), 10);
    return (
        hours +
        " giờ " +
        minutes +
        " phút " +
        seconds +
        " giây " +
        " ngày " +
        day +
        " tháng " +
        (month + 1) +
        " năm " +
        year
    );
};
