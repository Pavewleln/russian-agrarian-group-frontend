export interface ITab {
    _id: string;
    title: string;
}
export interface ICreateTab {
    title: string
}
export enum TabsLocalStorageNames {
    SELECTEDTABID = "selectedTabID"
}