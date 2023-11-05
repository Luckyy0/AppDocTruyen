import styles from "./NominatedComic.module.scss";
import classNames from "classnames/bind";
import NominatedComicItem from "./NominatedComicItem";
import ReactPaginate from "react-paginate";
import { CustomPagnition } from "../../../components";

const cx = classNames.bind(styles);

function NominatedComic() {
    const handlePageClick = (e) => {
        console.log(e.selected);
    };
    return (
        <div className={cx("wrapper")}>
            <div>
                <p className={cx("label", "col", "a-1")}>Truyện đề cử</p>
            </div>
            <div className="row">
                <div className="col a-6">
                    <NominatedComicItem />
                </div>
                <div className="col a-6">
                    <NominatedComicItem />
                </div>
                <div className="col a-6">
                    <NominatedComicItem />
                </div>
                <div className="col a-6">
                    <NominatedComicItem />
                </div>
            </div>
            <div className="a-12">
                <CustomPagnition pageCount={50} pageRangeDisplayed={5} handlePageClick={(e)=>console.log(e.selected)}/>
            </div>
        </div>
    );
}

export default NominatedComic;
