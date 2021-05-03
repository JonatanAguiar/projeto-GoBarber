import IMailTemplateProvider from "../models/IMailTemplateProvider";

class FakeMailTamplateProvider implements IMailTemplateProvider {
  public async parse(): Promise<string>{
    return "Mail content";
  }
}

export default FakeMailTamplateProvider;
