import { dehydrate } from "@tanstack/react-query";

import type { NextPage } from "next";
import Head from "next/head";

import { Layout } from "@app/components";
import WarehouseSettingLayout from "@app/components/warehouse-settings-layout";
import GeneralSettings from "@app/screens/general-settings";
import { withAuth } from "lib/withAuth";
import { getRequiredPageData } from "lib/withRequiredPageData";

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>Settings</title>
        <meta name="description" content="Turborepo Starter: Web" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <WarehouseSettingLayout>
          <GeneralSettings />
        </WarehouseSettingLayout>
      </Layout>
    </>
  );
};

export const getServerSideProps = withAuth(async (context, queryClient) => {
  await getRequiredPageData(context, queryClient, {
    withWarehouses: true,
    withCurrentWarehouse: true,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
});

export default Page;
