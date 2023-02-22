import {Injectable} from '@angular/core';
import {UserService} from "../user/user.service";
import {CategoriesService} from "../../../gs-api/src/services/categories.service";
import {CategoryDto} from "../../../gs-api/src/models/category-dto";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private userService: UserService,
    private categoriesService: CategoriesService
  ) {
  }

  enregistrerCategory(categoryDto: CategoryDto): Observable<CategoryDto> {
    categoryDto.idEntreprise = this.userService.getConnectedUser()?.entreprise?.id;
    return this.categoriesService.save(categoryDto);
  }

  findAllCategories(): Observable<CategoryDto[]> {
    return this.categoriesService.findAll();
  }

}
