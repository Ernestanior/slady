import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';

const useStore = create<StoreState & StoreActions>()(
  devtools(
      immer((set) => ({
        language:'en_US',
        scrollY:0,
         setLanguage:(language:string)=>set(()=>({language})),
         setScrollY:(scrollY:number)=>set(()=>({scrollY}))
      })),
      {
        name: 'aid-global-store',
      },
  ),
);
export default useStore;
export interface StoreState {
    language: 'zh_CN' | 'en_US';
    scrollY:number;

}

export interface StoreActions {
  setScrollY:any;
  setLanguage:any;
}
