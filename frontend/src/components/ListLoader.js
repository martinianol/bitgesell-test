import Skeleton from "react-loading-skeleton";

const ListLoader = () => {
  return (
    <div>
      <Skeleton
        count={15}
        height={18}
        width={120}
        style={{ display: "block", marginBottom: 22 }}
        inline
      />
    </div>
  );
};

export default ListLoader;
