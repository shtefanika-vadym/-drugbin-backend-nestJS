import { Body, Controller, Get, Param, Put, UseGuards } from "@nestjs/common";
import { HospitalService } from "src/hospital/hospital.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RolesGuard } from "src/auth/roles.guard";
import { Roles } from "src/auth/roles.decorator";
import { Role } from "src/hospital/enum/Role";
import { UpdateHospitalDto } from "src/hospital/dto/update-hospital.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { MessageResponse } from "src/reponses/message-response";
import { Hospital } from "src/hospital/hospital.model";
import { HospitalDto } from "src/hospital/dto/hospital.dto";

@ApiTags("Hospital")
@Controller("hospitals")
export class HospitalController {
  constructor(private companyService: HospitalService) {}

  // Retrieve all hospitals
  @ApiOperation({ summary: "Get all hospitals" })
  @ApiResponse({ status: 200, type: [Hospital] })
  @Get()
  async getAllPharmacies(): Promise<Hospital[]> {
    return this.companyService.getAllHospitals(Role.pharmacy);
  }

  // Update a hospital
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Update hospital" })
  @ApiResponse({ status: 200, type: [MessageResponse] })
  @Put(":id")
  updateCompany(
    @Body() companyDto: UpdateHospitalDto,
    @Param("id") id: string
  ): Promise<MessageResponse> {
    return this.companyService.updateCompany(companyDto, id);
  }

  // Retrieve hospital details
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Get hospital details" })
  @UseGuards(RolesGuard)
  @Roles(Role.recycle)
  @ApiResponse({ status: 200, type: [HospitalDto] })
  @Get("/:id")
  getPharmacy(@Param("id") id: number) {
    return this.companyService.getPharmacyDetails(id);
  }
}
