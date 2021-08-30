import { Layout, Menu } from "antd";
import HeaderPage from "../components/Header";
import SiderPage from "../components/Sider";

const { Content } = Layout;

const DefaultLayout = ({ children }) => {
	return (
		<Layout style={{ minHeight: "100vh" }}>
			<HeaderPage withAuth={true}></HeaderPage>
			<Content style={{ padding: "58px 50px" }}>
				<Layout
					className="site-layout-background"
					style={{ padding: "24px 0" }}
				>
                    <SiderPage></SiderPage>
					<Content style={{ marginLeft: 50, padding: "24px", minHeight: "100%", background: '#FFF'}}>
						{children}
					</Content>
				</Layout>
			</Content>
			<style jsx>{`
				.logo {
					float: left;
					width: 120px;
					height: 31px;
					margin: 16px 24px 16px 0;
					background: rgba(255, 255, 255, 0.2);
				}
				.site-layout .site-layout-background {
					background: #fff;
				}
				.site-layout-background {
					background: #fff;
				}
			`}</style>
		</Layout>
	);
};

export default DefaultLayout;
