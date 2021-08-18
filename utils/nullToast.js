export function nullToast(data) {
	
		let str =  (
			(data.name=='' && '标题') || 
			(data.activityReleaserId == '' && '发布人') ||
			(data.guideTeacherId == '' && '指导老师') ||
			(data.deptId == '' && '指导单位') ||
			(data.groupId == '' && '主办方') ||
			(data.admissionWay == '' && '录取方式') ||
			(data.enrollRange == '' && '报名范围') ||
			(data.enrollGrade == '' && '报名年级') ||
			(data.maxAdmissionNumber == '' && '最大录取人数') ||
			(data.enrollNotice == '' && '报名须知') ||
			(data.rankId == '' && '活动级别') ||
			(data.activityTag == '' && '活动标签') ||
			(data.courseClassificationId == '' && '关联分类') ||
			(data.courseId == '' && '关联课程') ||
			(data.integralScheme == '' && '积分方案') ||
			(data.flowerStatus == '' && '花絮管理') ||
			(data.evaluateStatus == '' && '评价管理') ||
			(data.activityPlace == '' && '活动地点') ||
			(data.activityPlaceName == '' && '地点详细描述') ||
			(data.activityRegisteDistance == '' && '签到距离') ||
			(data.activityManagerId == '' && '活动负责人') ||
			(data.activityOrganizerId == '' && '活动组织者') ||
			(data.images == '' && '图片素材') ||
			(data.activityIntroduce == '' && '活动介绍') || 'ok'
		)

		return str == 'ok'? str: str + '不能为空'
}