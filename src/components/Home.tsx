import { useEffect } from "react";
import { Link } from "react-router-dom";
import Photo from "./Photo";
import Loader from "react-loader-spinner";
import usePageBottom from "../hooks/usePageBottom";
import usePaginatedPosts from "../hooks/usePaginatedPosts";
import { motion } from "framer-motion";

const Home: React.FC = () => {
  const { loadingMore, loadMore, hasMore, posts } = usePaginatedPosts();

  const isPageBottom = usePageBottom();

  useEffect(() => {
    if (!isPageBottom) return;
    loadMore();
  }, [isPageBottom]);

  if (posts.length === 0) return null;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {
          opacity: 0,
        },
        visible: {
          opacity: 1,
          transition: {
            delay: 0.2,
          },
        },
      }}
    >
      <section className="grid">
        <div className="container">
          <h1 className="container__header my-4">Instagram</h1>
          <div className="row">
            <div className="col-sm-10 mx-auto">
              <div className="row">
                {posts.map((post) => (
                  <div className="col-sm-4" key={post.id}>
                    <Link
                      to={{
                        pathname: `/view/${post.id}`,
                        state: { modal: true },
                      }}
                    >
                      <Photo post={post} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {loadingMore && hasMore && <Loader type="Watch" height={30} width={30} className="text-center mb-4" />}
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
