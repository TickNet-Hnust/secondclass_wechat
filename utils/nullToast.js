export function nullToast(data, state) {
  //合法校验
  console.log(data);
  let str;
  if (state == "activity") {
    str =
      (data.name == "" && "活动名称") ||
      (data.activityReleaserId == "" && "发布人") ||
      (data.guideTeacherId == "" && "指导老师") ||
      (data.deptId == "" && "指导单位") ||
      (data.groupId == "" && "主办方") ||
      (data.admissionWay === "" && "录取方式") ||
      (data.enrollRange == "" && "报名范围") ||
      (data.enrollGrade == "" && "报名年级") ||
      (data.maxAdmissionNumber == "" && "最大录取人数") ||
      (data.enrollNotice == "" && "报名须知") ||
      (data.rankId === "" && "活动级别") ||
      (data.activityTag == "" && "活动标签") ||
      (data.trainingProgramId == "" && "培养方案") ||
      ([null, ""].includes(data.courseClassificationListOneId) && "积分分类") ||
      ([null, ""].includes(data.courseClassificationId) && "二级分类") ||
      (data.courseId == "" && "课程") ||
      (data.integralScheme === "" && "积分方案") ||
      (data.flowerStatus === "" && "花絮管理") ||
      (data.evaluateStatus === "" && "评价管理") ||
      ([null, ""].includes(data.activityPlace) && "活动地点") ||
      ([null, ""].includes(data.activityPlaceName) && "地点详细描述") ||
      ([null, ""].includes(data.activityRegisteDistance) && "签到距离") ||
      (data.activityManagerId == "" && "活动负责人") ||
      (data.activityOrganizerId == "" && "活动组织者") ||
      ([null, ""].includes(data.images) && "图片素材") ||
      (data.activityIntroduce == "" && "活动介绍") ||
      "ok";
    if (str == "ok") {
      console.log(+data.activityRegisteDistance, "zuidalusldfjrehu");
      str =
        (data.name.length > 20 && "活动名称长度不能大于20") ||
        (Number.isNaN(+data.maxAdmissionNumber) && "最大录取人数必须是数字") ||
        (data.activityTag &&
          data.activityTag.length > 10 &&
          "活动标签长度不能大于10") ||
        (data.activityPlaceName &&
          data.activityPlaceName.length > 10 &&
          "地点详细描述长度不能大于10") ||
        (Number.isNaN(+data.activityRegisteDistance) && "签到距离必须是数字") ||
        "ok";
      return str;
    }
  } else {
    str =
      (data.deptName == "" && "群组名称") ||
      (data.teacher == "" && "指导老师") ||
      (data.type == "" && "分类") ||
      (data.parentId == "" && "指导单位") ||
      (data.joinRule == "" && "加入规则") ||
      (data.avatar == "" && "群组头像") ||
      (data.introduce == "" && "报名须知") ||
      "ok";
    if (str == "ok") {
      str = (data.deptName.length > 20 && "活动名称长度不能大于20") || "ok";
      return str;
    }
  }
  return str == "ok" ? str : str + "不能为空";
}
