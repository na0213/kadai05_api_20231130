import Card from "@/components/Card";
import Layout from "@/components/Layout";
import { siteConfig } from "@/site.config";
import { IndexProps } from "@/types/types";
import { fetchPages } from "@/utils/notion";
import type { GetStaticProps, NextPage } from "next";
 
export const getStaticProps: GetStaticProps = async () => {
  const { results } = await fetchPages({});
  return {
    props: {
      pages: results ? results : [], //resultsがあればresultsを返し、resultsがなければ空の配列を返す
    },
    revalidate: 10, //ISRの仕組み 10秒で新しいデータ取得
  };
};

const Home: NextPage<IndexProps> = ({ pages }) => {
  // console.log(pages);
  return (
  <Layout>
    <div className="pt-12">
      <h1 className="text-5xl mb-8">{siteConfig.title}</h1>
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
 
export default Home;