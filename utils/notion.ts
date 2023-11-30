import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_KEY as string });
const DATABASE_ID = process.env.NOTION_DATABASE_ID as string;

export const fetchPages = async ({ slug, tag, }: {slug?: string, tag?: string}) => {

    const and: any = [ //フィルター条件が全部一致していれば（配列）
    {
        property: "isPublic",  //チェックが入っていれば
        checkbox: {
            equals: true,
        },
    },
    {
        property: "slug",  //中身が空っぽでなければ
        rich_text: {
            is_not_empty: true,
        },
    },
    ];

    if (slug) {
        and.push({
            property: "slug",
            rich_text: {
                equals: slug,
            },
        });
    }

    if (tag) {
        and.push({
            property: "tags",
            multi_select: {
                contains: tag,
            },
        });
    }

    return await notion.databases.query({
        database_id: DATABASE_ID,
        filter: {
            and: and,
        },
        sorts: [
            {
                property: "published",
                direction: "descending",
            },
        ],
    });
};

export const fetchBlocksByPageId = async (pageId: string) => {
    return await notion.blocks.children.list({ block_id: pageId });
};