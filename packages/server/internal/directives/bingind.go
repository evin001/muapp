package directives

import (
	"context"
	"fmt"

	"github.com/99designs/gqlgen/graphql"
	"github.com/go-playground/locales/en"
	ut "github.com/go-playground/universal-translator"
	"github.com/go-playground/validator/v10"
	en_translations "github.com/go-playground/validator/v10/translations/en"
)

var (
	validate *validator.Validate
	trans    ut.Translator
)

func init() {
	validate = validator.New()
	en := en.New()
	uni := ut.New(en, en)
	trans, _ = uni.GetTranslator("en")
	en_translations.RegisterDefaultTranslations(validate, trans)
}

func Binding(ctx context.Context, obj interface{}, next graphql.Resolver, constraint string) (res interface{}, err error) {
	val, err := next(ctx)
	if err != nil {
		return nil, fmt.Errorf(err.Error())
	}
	fieldName := *graphql.GetPathContext(ctx).Field

	err = validate.Var(val, constraint)
	if err != nil {
		validationErrors := err.(validator.ValidationErrors)
		transErr := fmt.Errorf("%s%+v", fieldName, validationErrors[0].Translate(trans))
		return val, transErr
	}

	return val, nil
}
