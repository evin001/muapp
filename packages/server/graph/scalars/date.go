package scalars

import (
	"fmt"
	"io"
	"strconv"
	"time"

	"github.com/99designs/gqlgen/graphql"
)

func MarshalDate(t time.Time) graphql.Marshaler {
	return graphql.WriterFunc(func(w io.Writer) {
		formatted := fmt.Sprintf("%d-%02d-%02d", t.Year(), t.Month(), t.Day())
		io.WriteString(w, strconv.Quote(formatted))
	})
}

func UnmarshalDate(v interface{}) (time.Time, error) {
	if tmpStr, ok := v.(string); ok {
		return time.Parse("2006-01-02", tmpStr)
	}
	return time.Time{}, fmt.Errorf("date should be YYYY-MM-DD formatted string")
}
