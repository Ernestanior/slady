import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';

const useStore = create<StoreState & StoreActions>()(
  devtools(
      immer((set) => ({
        language:'en_US',
         setLanguage:(language:string)=>set(()=>({language}))
      })),
      {
        name: 'aid-global-store',
      },
  ),
);
export default useStore;
export interface StoreState {
    language: 'zh_CN' | 'en_US';


}

export interface StoreActions {

    setLanguage:any;

}
