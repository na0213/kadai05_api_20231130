import Card from "@/components/Card";
import Layout from "@/components/Layout";
import { Params, TagProps } from "@/types/types";
import { fetchPages } from "@/utils/notion";
import { getMultiSelect } from "@/utils/property";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
    const { results }: { results: Record<string, any>[] } = await fetchPages({});  //存在しうるslugの一覧を返す。slugの存在を導き出し、パス一覧を作る

    const pathSet: Set<string> = new Set();
    for (const page of results) {
        for (const tag of getMultiSelect(page.properties.tags.multi_select)) {
            pathSet.add(tag);
        }
    }

    const paths = Array.from(pathSet).map((tag) => {
        return {
            params: {
                tag: tag,
            },
        };
    });

    return {
      paths: paths,
      fallback: "blocking",
    };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
    const {tag} = ctx.params as Params
  const { results } = await fetchPages({ tag: tag });
  return {
    props: {
      pages: results ? results : [], //resultsがあればresultsを返し、resultsがなければ空の配列を返す
      tag: tag,
    },
    revalidate: 10, //ISRの仕組み 10秒で新しいデータ取得
  };
};

const Tag: NextPage<TagProps> = ({ pages, tag }) => {
  // console.log(pages);
  return (
  <Layout>
    <div className="pt-12">
      <h1 className="text-5xl mb-8">{`#${tag}`}</h1>
      <div className="grid md:gap-6 mt-10 md:grid-cols-2 w-full my-12">
        {/* Card */}
        {pages.map((page, index) => (
          <Card key={index} page={page} />
        ))}
      </div>
    </div>
  </Layout>
  );
};
 
export default Tag;