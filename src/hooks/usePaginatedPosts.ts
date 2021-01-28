import { useEffect } from "react";
import usePagination from "firestore-pagination-hook";
import { db } from "../firebase";
import { useDispatch } from "react-redux";
import { getPaginatedPosts } from "../redux/actions";

export default function usePaginatedPosts() {
  const { items, loadMore, loadingMore, hasMore, loading } = usePagination(db.collection("posts"), { limit: 9 });

  const posts = items.map((item) => ({
    ...item.data(),
    id: item.id,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPaginatedPosts(posts));
  }, [dispatch, posts]);

  return { loadMore, loadingMore, hasMore, posts, loading };
}
