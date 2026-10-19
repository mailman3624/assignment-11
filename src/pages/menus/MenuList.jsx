import bestSellerBadge from "../../assets/bestseller.svg";

const MenuList = ({ menuList, deleteMenu, onEdit }) => {
  return (
    <div className="menu-list-box">
      <h2>Our Menu</h2>
      <ul>
        {menuList.map((item) => (
          <li key={item.menuId} className="menu-item">
            <span className="menu-info">
              {item.name} - {item.price} baht{" "}
              <span className="menu-type">
                ({item.type == null ? " - " : item.type.name})
              </span>
            </span>
            {item.isBestSeller && (
              <img
                src={bestSellerBadge}
                alt="Best Seller"
                className="badge-img"
              />
            )}
            <button
              type="button"
              className="edit-btn"
              onClick={() => onEdit(item)}
            >
              Edit
            </button>
            <button
              type="button"
              className="del-btn"
              onClick={() => deleteMenu(item.menuId)}
            >
              Del
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuList;
