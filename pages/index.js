import { Row, Col, Card, Form, Input, Button, message, Image } from "antd";
import DefaultLayout from "../layouts/DefaultLayout";
import { useState } from "react";
import numeral from "numeral";
import { getAppCookies, verifyToken } from "../commons/utlis";
import { useRouter } from "next/router";

const Home = () => {
	const [form] = Form.useForm();
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false)
	const [submiting, setSubmiting] = useState(false)
	const router = useRouter()

	const getData = async data => {
		setLoading(true)
		const res = await fetch(
			"https://fabelio-scrapper-api.herokuapp.com/api/scrape",
			{
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				method: "POST",
				body: JSON.stringify({ url: data.url }),
			}
		);
		const resp = await res.json();
		setLoading(false)
		if (!resp.success) {
			return message.error(resp.message);
		}
		setData(resp.data);
	};

  const saveData = async () => {
    setSubmiting(true)
	const res = await fetch("/api/product", {
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		method: "POST",
		body: JSON.stringify(data)
	})
	const resp = await res.json();
    setSubmiting(false)
	if(!resp.success){
		return message.error(resp.message);
	}
	router.push(`/detail/${data.product_slug}`)
  }

	return (
		<DefaultLayout>
			<Row gutter="10">
				<Col span="8">
					<Card title="Add Product">
						<Form form={form} onFinish={getData} layout="vertical">
							<Form.Item name="url" label="Fabelio Product URL">
								<Input placeholder="Fabelio Product URL" />
							</Form.Item>
							<Button type="primary" htmlType="submit" loading={loading}>
								Get Data
							</Button>
						</Form>
					</Card>
				</Col>
				<Col span="16">
					<Card title="Detail Product">
						{!data ? (
							<span>Cari Product Fabelio Sekarang !!</span>
						) : (
							<div>
								<Row gutter="5">
									<Col span="5">Nama Product</Col>
									<Col>:</Col>
									<Col span="12">{data.product_name}</Col>
								</Row>
								<Row gutter="5">
									<Col span="5">Description</Col>
									<Col>:</Col>
									<Col span="12">{data.product_description}</Col>
								</Row>
								<Row gutter="5">
									<Col span="5">Harga</Col>
									<Col>:</Col>
									<Col span="12">
										Rp.
										{numeral(data.product_price).format(
											"0,0"
										)}
									</Col>
								</Row>
								<Row gutter="5">
									{data.product_images.map(val => {
										return (
											<Col key={val}>
												<Image width={70} src={val} />
											</Col>
										);
									})}
								</Row>
								<Button onClick={saveData} style={{marginTop: 5}} type="primary" loading={submiting}>Submit Data</Button>
							</div>
						)}
					</Card>
				</Col>
			</Row>
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
		props: {
			profile: {
				token,
				...profile
			}
		},
	};
}

export default Home;
