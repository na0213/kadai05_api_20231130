import { PageType, RichTextType } from "@/types/types";

export const getText = (richTextArr: RichTextType[]) => {
    try {
        const textArr = richTextArr.map((richText) => richText.plain_text); //配列をmapで回し、richTextのオブジェクトに対してのplain_text（文字列）を配列にいれてtextArrへ
        return textArr.join(""); //文字列にする
    } catch (err) {

    }
    return ""; //失敗したら空を返す
};

export const getCover = (cover: PageType["cover"]) => {
    if (cover && cover.file) return cover.file.url; //fileという形でキーが存在するのであればcoverのfileのURLへアクセス
    if (cover && cover.external) return cover.external.url;
    return "/noimage.jpg";
};

export const getDate = (date: { start: string }) => {
    try {
        return date.start;
    } catch (err) {

    }
    return "-";
};

export const getMultiSelect = (multiSelect: [{ name: string }]) => {
    try {
        return multiSelect.map((tag) => tag.name);
    } catch (err) {

    }
    return [];
};