import { CreateOrFindUserRepositoryResponse } from "@/domain/types/database/repositories";

export abstract class FindVendorOrBuyerByUserIdAndDocumentsRepositoryPort {
  abstract execute(
    userId: string,
    document: string
  ): Promise<CreateOrFindUserRepositoryResponse>;
}
