export const filterDuplicates = (data: any) => {
    if (!data) {
        return [];
    }
    return data.filter((elem: { id: any; }, index: any, arr: any[]) => arr.findIndex(obj => (obj?.id === elem?.id)) === index)
}