import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProjectsEntity } from '../entities/projects.entity';
import { ProjectDTO, ProjectUpdateDTO } from '../dto/project.dto';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectsEntity)
    private readonly projectRepository: Repository<ProjectsEntity>,
  ) {}

  public async createProject(body: ProjectDTO): Promise<ProjectsEntity> {
    try {
      const lastProject: ProjectsEntity = await this.projectRepository
        .createQueryBuilder('project')
        .orderBy('project.id', 'DESC')
        .getOne();

      let initialId = 1001;

      if (lastProject) {
        initialId = lastProject.id + 1;
      }

      const newProject = new ProjectsEntity();

      newProject.id = initialId;
      newProject.name = body.name;
      newProject.description = body.description;

      const project = await this.projectRepository.save(newProject);

      return project;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findProjects(): Promise<ProjectsEntity[]> {
    try {
      const projects: ProjectsEntity[] = await this.projectRepository.find();

      if (projects.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró ningún resultado...!',
        });
      }
      return projects;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findProjectById(id: number): Promise<ProjectsEntity> {
    try {
      const project: ProjectsEntity = await this.projectRepository
        .createQueryBuilder('project')
        .where({ id })
        .getOne();

      if (!project) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró ningún resultado',
        });
      }
      return project;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateProject(
    body: ProjectUpdateDTO,
    id: number,
  ): Promise<UpdateResult | undefined> {
    try {
      const project: UpdateResult = await this.projectRepository.update(
        id,
        body,
      );

      if (project.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar...!',
        });
      }
      return project;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteProject(id: number): Promise<DeleteResult> {
    try {
      const project: DeleteResult = await this.projectRepository.delete(id);

      if (project.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo eliminar...!',
        });
      }

      return project;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
