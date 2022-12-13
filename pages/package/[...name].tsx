import { GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { getAllNames, getPackageByName } from "../../service/package";

interface PackageProps {
  pkg: Package;
}

interface Params extends ParsedUrlQuery {
  name: string[];
}

const Package: NextPage<PackageProps> = ({ pkg }) => {
  return (
    <main>
      <h1 className="text-3xl font-bold">{pkg.shortName}</h1>
      <p className="underline">{pkg.name}</p>
    </main>
  );
};

export const getStaticProps: GetStaticProps<PackageProps, Params> = async (
  context
) => {
  const { name } = context.params!;
  const pkg = await getPackageByName(["zeek"].concat(name).join("/"));

  if (!pkg) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      pkg,
    },
  };
};

export async function getStaticPaths() {
  const names = await getAllNames();
  const paths = names.map((name) => ({
    params: { name: name.split("/").slice(1) },
  }));
  return { paths, fallback: "blocking" };
}

export default Package;
