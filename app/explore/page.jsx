import Head from "next/head";

function page() {
  return (
    <div>
      <Head>
        <title>My Custom Page Title</title>
        <meta name="description" content="Custom description for my page" />
        {/* Add more meta tags or other head elements here */}
      </Head>
      page
    </div>
  );
}

export default page;
