import { Layout, Menu } from "antd";
import { PlusOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { useRouter } from "next/dist/client/router";

const { Sider } = Layout;

const SiderPage = () => {
	const router = useRouter();
    
	return (
		<Sider
			className="site-layout-background"
			style={{ height: 90 }}
			width={200}
		>
			<Menu
				mode="inline"
				defaultSelectedKeys={[router.asPath]}
				style={{ height: "100%" }}
			>
				<Menu.Item
					key="/"
					icon={<PlusOutlined />}
					onClick={() => router.push("/")}
				>
					<span>Add Product</span>
				</Menu.Item>
				<Menu.Item
					key="/list"
					icon={<UnorderedListOutlined />}
					onClick={() => router.push("/list")}
				>
					<span>List Product</span>
				</Menu.Item>
			</Menu>
		</Sider>
	);
};

export default SiderPage;
