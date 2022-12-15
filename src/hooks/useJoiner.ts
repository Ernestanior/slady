
const useJoiner = () => {

    return (msgList: TmsgList[]) => {
        return msgList.map((t) => t.id).join("")
    }

}
export default useJoiner

type TmsgList = { intl: boolean, id: string }