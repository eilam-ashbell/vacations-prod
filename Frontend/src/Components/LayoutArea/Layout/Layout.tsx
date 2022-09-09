import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {
    return (
        <div className="Layout">
                <Header fullName="Eilam Ashbell" />
            <div className="container">
                {/* <Menu /> */}
                {/* <hr /> */}
                <Routing />
            </div>
        </div>
    );
}

export default Layout;
