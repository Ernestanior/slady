import ModalX from "@/common/modal";
import Routers from "@/router";
import ModalF from "@/common/modal/modalF";

function PC() {
    return (
        <div style={{minWidth:1400}}>
                <ModalX />
                <ModalF/>
                <Routers />
        </div>
    );
}

export default PC;
