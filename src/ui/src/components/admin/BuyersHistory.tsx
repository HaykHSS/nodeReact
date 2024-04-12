import AuthStore from "@/store/AuthStore";
import { IProduct } from "@/store/ProductsStore";
import React, { useEffect, useState } from "react";

const formatDate = (date: Date) => {
  console.log(date, date instanceof Date);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // JS months are zero-indexed
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

interface IPurchase {
  _id: string;
  username: string;
  totalPrice: number;
  date: Date;
  products: IProduct[];
  iat: Date;
}

const BuyersHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [buyersHistoryData, setBuyersHistoryData] = useState<IPurchase[]>([]);
  const [filteredData, setFilteredData] = useState<IPurchase[]>([]);

  const { accessToken } = AuthStore();

  useEffect(() => {
    const filterData = () => {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      const filtered = buyersHistoryData.filter((entry) =>
        entry.username.toLowerCase().includes(lowercasedSearchTerm)
      );
      setFilteredData(filtered);
    };

    if (searchTerm === "") {
      setFilteredData(buyersHistoryData);
    } else {
      filterData();
    }
  }, [searchTerm, buyersHistoryData]);

  useEffect(() => {
    const getBuyersHistory = async () => {
      try {
        const res = await fetch("/api/purchase", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
        });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log(data);
        setBuyersHistoryData(data);
        setFilteredData(data); // Initialize filtered data
      } catch (e) {
        console.error("Failed to fetch buyers history:", e);
      }
    };

    if (accessToken) {
      getBuyersHistory();
    }
  }, [accessToken]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="w-[1000px] flex flex-col gap-4">
      <h1 className="text-xl">Buyers History</h1>
      <input
        type="text"
        placeholder="Search by username..."
        value={searchTerm}
        onChange={handleInputChange}
        className="border border-gray-300 px-3 py-2 rounded-md"
      />
      <div className="border h-64 overflow-scroll">
        <div className="grid grid-cols-5 text-md font-semibold text-left text-gray-500">
          <div className="px-4 py-2">Id</div>
          <div className="px-4 py-2">Username</div>
          <div className="px-4 py-2">Products</div>
          <div className="px-4 py-2">Total Amount $</div>
          <div className="px-4 py-2">Date</div>
        </div>
        {filteredData.map((entry, index) => (
          <div
            key={entry._id}
            className="grid grid-cols-5 text-md text-gray-700 bg-gray-100 border-b"
          >
            <div className="px-4 py-2">{index + 1}</div>
            <div className="px-4 py-2">{entry.username}</div>
            <div className="px-4 py-2">
              {entry.products.map((item: IProduct) => item.productName).join(", ")}
            </div>
            <div className="px-4 py-2">${entry.totalPrice}</div>
            <div className="px-4 py-2">{formatDate(new Date(entry.iat))}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyersHistory;
