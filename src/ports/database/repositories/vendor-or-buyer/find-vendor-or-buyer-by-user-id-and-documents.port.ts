import { CreateOrFindUserRepositoryResponse } from "@/domain/types/database/repositories";

export abstract class FindVendorOrBuyerByUserIdAndDocumentsRepositoryPort {
  abstract execute(email: string): Promise<CreateOrFindUserRepositoryResponse>;
}
