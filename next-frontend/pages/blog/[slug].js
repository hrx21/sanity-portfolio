import { useRouter } from 'next/router';
import { createClient } from 'next-sanity';
import PortableText from 'react-portable-text';

const Post = ({ blog }) => {
  const router = useRouter();

  return (
    <>
      <title>{blog.title}</title>
      <link rel="canonical" href="//post" />
      <meta property="og:url" content="//post" />

      <div className="flex justify-center items-center">
        <h1>{blog.title}</h1>
      </div>
    </>
  );
};

export default Post;

export const getServerSideProps = async (context) => {
  const { slug } = context.query;
  const client = createClient({
    projectId: '2r10b4al',
    dataset: 'production',
    useCdn: false,
  });
  const query = `*[_type == "blog" && slug.current == '${slug}'][0]`;
  const blog = await client.fetch(query);
  // const profileQuery = `*[_type == "profile"][0]`;
  // const profile = await client.fetch(profileQuery);
  return {
    props: {
      blog,
      // profile
    },
  };
};
