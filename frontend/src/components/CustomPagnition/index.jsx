import styles from "./Pagnition.module.scss";
import classNames from "classnames/bind";
import ReactPaginate from "react-paginate";

const cx = classNames.bind(styles);

function CustomPagnition({
    pageRangeDisplayed,
    pageCount,
    handlePageClick,
    currentPage,
}) {
    return (
        <ReactPaginate
            className={cx("wrapper")}
            pageClassName={cx("page")}
            nextClassName={cx("page")}
            previousClassName={cx("page")}
            pageLinkClassName={cx("pageLink")}
            previousLinkClassName={cx("pageLink")}
            nextLinkClassName={cx("pageLink")}
            breakClassName={cx("break")}
            breakLinkClassName={cx("break")}
            activeClassName={cx("activePage")}
            disabledClassName={cx("disable")}
            breakLabel=". . ."
            nextLabel="next >"
            onPageChange={handlePageClick}
            forcePage={currentPage}
            pageRangeDisplayed={pageRangeDisplayed}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
        />
    );
}

export default CustomPagnition;
