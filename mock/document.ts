import { FundamentalDocumentType } from '@/polymerizer/document-fundamental';
import { faker } from '@faker-js/faker';
import { defineMock } from 'umi';

export default defineMock({
  'POST /mock/upload-file-reference': (req, res) => {
    res.json({
      name: faker.person.fullName(),
      url: faker.image.url(),
      code: faker.string.nanoid(),
    });
  },
  'GET /mock/document-types': (req, res) => {
    const length = faker.number.int({
      min: 5,
      max: 10,
    });
    const documentTypes: FundamentalDocumentType[] = [];

    for (let index = 0; index < length; index++) {
      documentTypes.push({
        attachmentCode: faker.string.nanoid(),
        attachmentName: faker.internet.displayName(),
        // @ts-expect-error
        isMulti: faker.helpers.arrayElement(['YES', 'NO']),
        needOcr: faker.datatype.boolean(),
      });
    }

    res.json(documentTypes);
  },
});
