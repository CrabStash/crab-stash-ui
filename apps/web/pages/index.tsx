import { dehydrate } from "@tanstack/react-query";

import type { NextPage } from "next";
import Head from "next/head";

import { Layout } from "@app/components";
import useWarehousesQuery from "@app/hooks/queries/use-warehouses-query";
import Dashboard from "@app/screens/dashboard";
import WarehouseCreator from "@app/screens/warehouse-creator";
import { withAuth } from "lib/withAuth";
import { getRequiredPageData } from "lib/withRequiredPageData";

const Web: NextPage = () => {
  const { data } = useWarehousesQuery();

  return (
    <>
      <Head>
        <title>Turborepo Starter: Web</title>
        <meta name="description" content="Turborepo Starter: Web" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>{data?.response.data.length === 0 ? <WarehouseCreator /> : <Dashboard />}</Layout>
    </>
  );
};

export const getServerSideProps = withAuth(async (_, queryClient) => {
  await getRequiredPageData(queryClient, {
    //    withWarehouses: true,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
});

export default Web;
