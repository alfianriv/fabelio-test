import { Space, Card, Typography, Form, Button, Input, message } from "antd";
import { useRouter } from "next/dist/client/router";
import { getAppCookies, verifyToken } from "../../commons/utlis";
import Cookies from 'js-cookie'

const Login = () => {
    const [form] = Form.useForm();
	const Router = useRouter()

	const onFinish = async data => {
		const res = await fetch("/api/login", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
			method: "POST",
			body: JSON.stringify(data),
		});

		const resp = await res.json();
		if (resp.success) {
			Cookies.set("token", resp.data.token);
			Router.push("/");
		} else {
			message.error(resp.message);
		}
	};

	return (
		<Space
				align="center"
				style={{ height: "100vh", background: "#000"}}
				direction="horizontal"
			>
				<Space
					align="center"
					style={{ width: "100vw" }}
					direction="vertical"
				>
					<Card style={{ width: 300 }}>
						<Typography.Title
							style={{ textAlign: "center" }}
							level={3}
						>
							Login
						</Typography.Title>
						<Form
							onFinish={onFinish}
							form={form}
							layout="vertical"
							requiredMark={false}
						>
							<Form.Item
								name="username"
								label="Username"
								rules={[
									{
										required: true,
										message: "Please input your username!",
									},
								]}
							>
								<Input placeholder="Username" />
							</Form.Item>
							<Form.Item
								name="password"
								label="Password"
								rules={[
									{
										required: true,
										message: "Please input your password!",
									},
								]}
							>
								<Input.Password placeholder="Password" />
							</Form.Item>
							<Form.Item>
								<Button block type="primary" htmlType="submit">
									Login
								</Button>
							</Form.Item>
							<Typography.Text
								style={{
									display: "flex",
									justifyContent: "center",
									gap: 2,
								}}
							>
								Do not have account?{" "}
								<Typography.Link href="/auth/register">
									Register
								</Typography.Link>
							</Typography.Text>
						</Form>
					</Card>
				</Space>
			</Space>
	);
};

export async function getServerSideProps(context) {
	const { req } = context;
	const { token } = getAppCookies(req);
	const profile = token ? verifyToken(token) : "";
	if (profile) {
		return {
			redirect: {
				destination: "/",
			},
		};
	}
	return {
		props: {},
	};
}

export default Login;
