const mockBuilder = (item, list) => {
  return jest.fn().mockReturnValue({
    select: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    offset: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    getOne: jest.fn().mockResolvedValue(item),
    getMany: jest.fn().mockResolvedValue(list),
    skip: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
  });
};
export default mockBuilder;
