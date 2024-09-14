import CustomError from "@root/kernel/custom-error";
import ErrorCode from "@root/kernel/error-code";

export default class BaseModelService {
  static async getAggregateList(
    pipeline: Array<object>,
    options: any,
    model: any
  ): Promise<any> {
    const { limit, offset, page } = options;
    const docs = await model.aggregate(pipeline);

    return { docs, limit, offset, page };
  }

  static async create(data: any, model: any): Promise<any> {
    return await model.create(data);
  }

  static async update(
    query: any,
    data: any,
    options: any,
    model: any
  ): Promise<any> {
    query["deleted_at"] = null;

    const entity = await model.findOneAndUpdate(query, data, options);

    if (!entity) throw new CustomError(ErrorCode.NOT_FOUND);

    return entity;
  }

  static async updateMany(
    query: any,
    data: any,
    options: any,
    model: any
  ): Promise<any> {
    query["deleted_at"] = null;

    const entity = await model.updateMany(query, data, options);

    if (!entity) throw new CustomError(ErrorCode.NOT_FOUND);

    return entity;
  }

  static async checkDuplicate(query: any, model: any): Promise<any> {
    query["deleted_at"] = null;

    const entity = await this.getOne(query, model);

    if (entity) throw new CustomError(ErrorCode.DATA_EXIST);

    return entity;
  }

  static async deleteOne(
    query: any,
    data: any,
    option: any,
    model: any
  ): Promise<any> {
    query["deleted_at"] = null;

    const entity = await model.findOneAndUpdate(query, data, option);

    if (!entity) throw new CustomError(ErrorCode.NOT_FOUND);

    return entity;
  }

  static async getOne(query: any, model: any): Promise<any> {
    query["deleted_at"] = null;

    return await model.findOne(query);
  }

  static async getList(
    query: any,
    model: any,
    populateField: any = []
  ): Promise<any> {
    query["deleted_at"] = null;

    return await model.find(query).populate(populateField);
  }

  static async countList(query: any, model: any): Promise<any> {
    query["deleted_at"] = null;

    return await model.countDocuments(query);
  }

  static async countAggregateList(
    pipeline: Array<object>,
    model: any
  ): Promise<any> {
    pipeline.push({ $count: "total" });

    const result = (await model.aggregate(pipeline))[0]?.total;

    return result;
  }
}
