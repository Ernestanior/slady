import useStore from "@/store/store";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useScrollRestoration = () => {
    const {scrollY,setScrollY}=useStore()
    const location = useLocation();

    useEffect(() => {
        // 获取当前路径
        // 恢复上次滚动位置
        if (scrollY) {
        window.scrollTo(0, scrollY);
        }

        // 监听滚动事件并存储滚动位置
        const saveScrollPosition = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener("scroll", saveScrollPosition);

        return () => {
        window.removeEventListener("scroll", saveScrollPosition);
        };
    }, [location]);

    return scrollY; // 这个组件不需要渲染任何东西
};

export default useScrollRestoration;
