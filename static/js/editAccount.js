$(".form-group").on("click", "a", function(){
	const formGroup = $(this).parent()
	$(":input", formGroup).removeAttr("readonly")
	$(":input", formGroup).removeAttr("disabled")
	$(":input", formGroup).prop("required", true)
	$(".save-changes", formGroup).show()
	$(this).hide()
})