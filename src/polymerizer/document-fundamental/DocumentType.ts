export enum YesOrNo {
  Yes = 'YES',
  No = 'NO',
}

export interface FundamentalDocumentType {
  attachmentCode: string;
  attachmentName: string;
  isMulti: YesOrNo;
  needOcr: boolean;
}
