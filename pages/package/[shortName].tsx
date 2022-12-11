import { GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { getAllShortNames, getPackageByShortName } from "../../service/package";

interface PackageProps {
  pkg: Package;
}

interface Params extends ParsedUrlQuery {
  shortName: string;
}

const Package: NextPage<PackageProps> = ({ pkg }) => {
  return (
    <main>
      <h1>{pkg.shortName}</h1>
      <p>{pkg.name}</p>
    </main>
  );
};

export const getStaticProps: GetStaticProps<PackageProps, Params> = async (
  context
) => {
  const { shortName } = context.params!;
  const pkg = await getPackageByShortName(shortName);

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
  const shortNames = await getAllShortNames();
  const paths = shortNames.map((shortName) => ({
    params: { shortName },
  }));
  return { paths, fallback: "blocking" };
}

export default Package;
