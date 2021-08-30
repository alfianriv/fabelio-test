import { Layout, Menu, Typography, Button } from "antd";
import { setLogout } from "../commons/utlis";

const { Header } = Layout;

const HeaderPage = ({ withAuth = false }) => {
	return (
		<Header
			style={{
				position: "fixed",
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				zIndex: 1,
				width: "100%",
			}}
		>
			<div className="logo">
				<span>Fabelio {withAuth ? "Dashboard" : null}</span>
			</div>
			{withAuth ? (
				<Button type="danger" onClick={setLogout}>
					Logout
				</Button>
			) : null}
			<style jsx>{`
				.logo {
					color: #fff;
					float: left;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 200px;
					height: 31px;
					margin: 16px 24px 16px 0;
					background: rgba(255, 255, 255, 0.2);
				}
			`}</style>
		</Header>
	);
};

export default HeaderPage;
