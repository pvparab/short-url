import { environment } from '../../environments/environment';
export class CommonURL {
    apiURL = environment.baseURL;
    login = this.apiURL + 'v1/users/login';
    users = this.apiURL + 'v1/users';
    decorationItems = this.apiURL + 'v1/decoration/items';
    decorationItemsAll = this.decorationItems + '/all';
    employee = this.apiURL + 'v1/employee';
    employeeAll = this.employee + '/all';
    challan = this.apiURL + 'v1/challan';
    challanAll = this.challan + '/all';
    challanIDS = this.challan + '/all/byids';
    challanItem = this.challan + '/item';
    invoice = this.apiURL + 'v1/invoice';
    invoiceAll = this.invoice + '/all';
    clients = this.apiURL + 'v1/clients';
    clientsAll = this.clients + '/all';
    gallery = this.apiURL + 'v1/gallery';
    galleryAll = this.gallery + '/all';
    clientitemprice = this.apiURL + 'v1/clientitemprice';
    clientitempricebyid = this.apiURL + 'v1/clientitempricebyid';

    clientitempriceAll = this.clientitemprice + '/all';
    getAllUser = this.apiURL + 'v1/users/all';
    register = this.apiURL + 'v1/users/signup';
    logout = this.apiURL + 'api/logout';
}
