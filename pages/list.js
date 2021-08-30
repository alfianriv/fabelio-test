/* eslint-disable react/display-name */
import { Table, Tag, Space } from "antd";
import DefaultLayout from "../layouts/DefaultLayout";
import numeral from "numeral";
import { getAppCookies, verifyToken } from "../commons/utlis";
import useSWR from "swr";
import { useState, useEffect } from "react";

const fetcher = (url) => fetch(url).then((res) => res.json());

const List = () => {
	const { data } = useSWR("/api/products", fetcher);
	const [products, setProducts] = useState([]);
	
	useEffect(() => {
		if(data){
			setProducts(data.data)
		}
	}, [data])

	const columns = [
		{
			title: "Name",
			dataIndex: "product_name",
			key: "product_name",
		},
		{
			title: "Price",
			dataIndex: "product_price",
			key: "product_price",
			render: text => `Rp.${numeral(text).format("0,0")}`,
		},
		{
			title: "Description",
			dataIndex: "product_description",
			key: "product_description",
		},
		{
			title: "Action",
			key: "action",
			render: (text, record) => (
				<Space size="middle">
					<a href={`/detail/${record.product_slug}`}> View </a>
				</Space>
			),
		},
	];

	return (
		<DefaultLayout>
			<Table columns={columns} dataSource={products} />
		</DefaultLayout>
	);
};

export async function getServerSideProps(context) {
	const { req } = context;
	const { token } = getAppCookies(req);
	const profile = token ? verifyToken(token) : "";
	if (!profile) {
		return {
			redirect: {
				destination: "/auth/login",
			},
		};
	}
	return {
		props: {},
	};
}

export default List;
