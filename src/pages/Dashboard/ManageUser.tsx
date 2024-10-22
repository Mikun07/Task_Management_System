import { fetchAllUser } from "@/redux/features/getAllUserSlice";
import { RootState } from "@/redux/root";
import { AppDispatch } from "@/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ManageUser = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllUser());
  }, [dispatch]);

  const { data: allUser, loading: isLoading } = useSelector(
    (state: RootState) => state?.getAllUser
  );

  // console.log(allUser);

  return <div>ManageUser</div>;
};

export default ManageUser;
