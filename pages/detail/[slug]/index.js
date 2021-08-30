import {
	Row,
	Col,
	Typography,
	Image,
	Divider,
	Form,
	Input,
	Button,
	Card,
	message,
} from "antd";
import EmptyLayout from "../../../layouts/EmptyLayout";
import absoluteUrl from "next-absolute-url";
import numeral from "numeral";
import { useState } from "react";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import update from 'immutability-helper';

const Detail = ({ product, comments }) => {
	const [form] = Form.useForm();
	const [selected, setSelected] = useState(0);
	const [dataComments, setDataComments] = useState(comments);
	const [loading, setLoading] = useState(false);

	const onFinish = async data => {
		setLoading(true);
		const res = await fetch("/api/comment", {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({ ...data, product_id: product.id }),
		});
		const resp = await res.json();
		setLoading(false);
		if (!resp.success) {
			return message.error(resp.message);
		}
		setDataComments([resp.data, ...dataComments]);
	};

	const vote = async (id, index, vote) => {
		const res = await fetch("/api/vote", {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({ vote: vote, id: id}),
		})
		const resp = await res.json();
		if(!resp.success){
			return message.error(resp.message);
		}
		setDataComments(update(dataComments, {[index]: {$set: resp.data}}))
	}

	return (
		<EmptyLayout>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<Typography.Title style={{ margin: 0 }} level={3}>
					{product.product_name}
				</Typography.Title>
				<Typography.Title style={{ margin: 0 }} level={4}>
					Rp.{numeral(product.product_price).format("0,0")}
				</Typography.Title>
			</div>
			<div style={{ position: "relative" }}>
				<div style={{ marginTop: 10 }}>
					<Image
						width={"100%"}
						src={product.product_images[selected]}
						preview={false}
					/>
				</div>
				<div style={{ position: "absolute", bottom: 20 }}>
					<Row gutter="20">
						{product.product_images.map((val, i) => {
							return (
								<Col key={i}>
									<div onClick={() => setSelected(i)}>
									<Image
										width={50}
										src={val}
										preview={false}
									/>
									</div>
								</Col>
							);
						})}
					</Row>
				</div>
			</div>
			<div>
				<Typography.Title style={{ margin: 0 }} level={5}>
					Description
				</Typography.Title>
				<p>{product.product_description || "-"}</p>
			</div>
			<Divider orientation="left">Comments</Divider>
			{dataComments && dataComments.length > 0 ? dataComments.map((val, i) => {
				return (
					<Row key={val} style={{ marginBottom: 10 }}>
						<Col span="12">
							<Card>
								<p>{val.comment}</p>
								<Row gutter="5">
									<Col>
										<Button onClick={() => vote(val.id, i, 'up')}type="primary"><CaretUpOutlined /> {val.upvote}</Button>
									</Col>
									<Col>
										<Button onClick={() => vote(val.id, i, 'down')} type="danger"><CaretDownOutlined /> {val.downvote}</Button>
									</Col>
								</Row>
							</Card>
						</Col>
					</Row>
				);
			}) : null}
			<Row>
				<Col span="12">
					<Form
						onFinish={onFinish}
						form={form}
						layout="vertical"
						requiredMark={false}
					>
						<Form.Item
							name="comment"
							label="Comment"
							rules={[
								{
									required: true,
									message: "Comment cannot empty",
								},
								{
									min: 50,
									message:
										"Comment must be more than 50 characters",
								},
							]}
						>
							<Input.TextArea placeholder="Please add your comment about this product" />
						</Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							loading={loading}
						>
							Comment
						</Button>
					</Form>
				</Col>
			</Row>
		</EmptyLayout>
	);
};

export async function getServerSideProps(context) {
	const { req, params } = context;
	const { origin } = absoluteUrl(req);
	const res = await fetch(`${origin}/api/product?slug=${params.slug}`);
	const data = await res.json();
	if (!data.success) {
		return {
			notFound: true,
		};
	}
	const resComment = await fetch(
		`${origin}/api/comments?product_id=${data.data.id}`
	);
	const dataComment = await resComment.json();
	return {
		props: {
			product: data.data,
			comments: dataComment.data,
		},
	};
}

export default Detail;
